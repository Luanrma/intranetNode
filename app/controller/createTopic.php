<?php

require_once ('../model/User.php');

//$senha = $_POST["inputSenha"];
//$verificaSenha = $_POST["inputVerificaSenha"];
$list = file_get_contents("php://input");

$data = json_decode($list, true);

$title  = $data["inputTopicTitle"];
$question = $data["inputTopicText"];
//if ($senha === $verificaSenha && $senha != null && $verificaSenha != null) {
        $objUser = new Sql();

        $objUser->setTopicTitle($title);
        $objUser->setText($question);
        $objUser->createTopic();

    
//} else {
  //  $_SESSION['msgErro'] = 'Senhas diferentes';
    //header('Location:../view/cadastroPessoa.php');
//    exit();
//}