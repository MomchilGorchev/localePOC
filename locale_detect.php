<?php
/**
 * Created by IntelliJ IDEA.
 * User: momchillgorchev
 * Date: 26/01/15
 * Time: 11:04
 */

    if($_SERVER['REQUEST_METHOD'] == 'GET'){
        //$locale = Locale::acceptFromHttp($_SERVER['HTTP_ACCEPT_LANGUAGE']);
        $locale = $_SERVER['HTTP_ACCEPT_LANGUAGE'];
        echo $locale;
    }
    else {
        echo 'POST request';
    }