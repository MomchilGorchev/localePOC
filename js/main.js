/**
 * Created by momchillgorchev on 26/01/15.
 */

$(function(){
    // On click for debugging convenience
    $('#trigger').on('click', function(e){
        e.preventDefault();
        // Prepare vars
        var locale = null,
            fileName = null,
            template = null,
            defaultTemplate = null,
            // This can be dynamic
            data = {
                name: 'Momchil',
                email : 'mgorchev@powa.com'
            };
        // First request to determine the locale
        // should be automated e.g the request hits the BE script first
        $.ajax({
            url: 'locale_detect.php',
            method: 'GET'
            // We know the locale of the user
        }).done(function(response){
            // Get the first (main) one
            locale = response.slice(0, 2);
            // Get the path to the template file
            fileName = $('#'+ locale).attr('src');
            // Request to retrieve the relative template file.
            $.ajax({
                url: fileName,
                dataType: 'text'
            }).done(function(response){
                //console.log(response);
                // handle the response and load the compile the template
                template = Handlebars.compile(response);
                $('#locale-flag').html('Your locale is: <em>'+ locale.toUpperCase() +'</em>');
                $('.content').html(template(data));
                // No template with this name
            }).fail(function(error){
                if(error.status === 404){
                    // If locale is unsupported defaults to english
                    defaultTemplate = $('#default').html();
                    // Compile
                    template = Handlebars.compile(defaultTemplate);
                    // And insert into the DOM
                    $('.content').html(template(data));
                }
                else{
                    // All other errors
                    console.log('Error occurred: ' + error.responseText);
                }
            });
        });
    });

});