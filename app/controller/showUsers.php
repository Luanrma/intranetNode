<?php 

require_once '../model/User.php';

$objUser = new Sql(); 
echo $objUser->showUsers();
