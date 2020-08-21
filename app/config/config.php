<?php

spl_autoload_register(function($class_name) {

    $separ = DIRECTORY_SEPARATOR;

    $filename = "app".$separ."model".$separ.$class_name.".php";

    if (file_exists($filename)) {
        require_once($filename);
    }
});