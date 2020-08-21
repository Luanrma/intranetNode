<?php 

require_once '../model/User.php';

$id = $_GET['topic'];

$objTopic = new Sql();

$objTopic-> setID($id);

echo $objTopic->showSelectTopics();
