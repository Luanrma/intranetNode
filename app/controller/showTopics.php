<?php 

require_once '../model/User.php';

//$objTopic = new User(); 
//echo $objTopic->showTopics();

$sql = new Sql(); 
echo $sql->select("SELECT * FROM topics");

