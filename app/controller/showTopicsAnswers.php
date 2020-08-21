<?php 

require_once '../model/User.php';

$list = file_get_contents("php://input");

$data = json_decode($list, true);

$id  = $data["topicId"];

$objTopic = new Sql();
$objTopic-> setID($id);

echo $objTopic->showTopicsAnswers();
