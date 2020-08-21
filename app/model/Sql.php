<?php
//session_start();

class Sql extends PDO {

    private $ID;
    private $name;
    private $pass;
    private $email;
    private $topicTitle;
    private $text;
    private $conn;

    public function getID() {return $this->ID;}
    public function setID($ID) {$this->ID = $ID;}
    
    public function getName() {return $this->name;}
    public function setName($name) {$this->name = $name;}
    
    public function getPass() {return $this->pass;}
    public function setPass($pass) {$this->pass = $pass;}
    
    public function getEmail() {return $this->email;}
    public function setEmail($email) {$this->email = $email;}

    public function getTopicTitle() {return $this->topicTitle;}
    public function setTopicTitle($topicTitle) {$this->topicTitle = $topicTitle;}

    public function getText() {return $this->text;}
    public function setText($text) {$this->text = $text;}
    
    public function __construct() {

        $this->conn = new PDO("mysql:host=localhost;dbname=intranet", "root", "");

    }

    public function select($rawQuery, $params = array()):array {

        $stmt = $this->query($rawQuery, $params);

        return $stmt->fetchAll(PDO::FETCH_ASSOC);

    }
    
    public function insert($rawQuery, $params = array()) {

        $stmt = $this->query($rawQuery, $params);

        return $stmt->execute();
    }

    public function query($rawQuery, $params = array()) {

        $stmt = $this->conn->prepare($rawQuery);

        $this->setParams($stmt, $params);

        $stmt->execute();

        return $stmt;
        
    }

    private function setParams($statement, $parameters = array()) {

        foreach ($parameters as $key => $value) {

            $this->setParam($statement, $key, $value);

        }
    }
    
    public function setParam($statement, $key, $value) {

        $statement->bindParam($key, $value);

    }

    public function createTopic() {
       // include_once 'conection.php';
        $stmt = $this->conn->prepare("INSERT INTO topics (TITLE, QUESTION) "
                . "VALUES(:title, :question)");
        
        $stmt->bindParam(":title", $this->getTopicTitle());
        $stmt->bindParam(":question", $this->getText());
            
        $stmt->execute();

        exit();
        
    }
    
    public function showTopics() {
        include_once 'conection.php';
        $stmt = $this->conn->prepare("SELECT * FROM topics");
        $stmt->execute();
        $results = $stmt->fetchAll(PDO::FETCH_ASSOC);
        $json = json_encode($results);
        return($json);
        //file_put_contents('../assets/js/data.json', $json);
    }

    public function showSelectTopics() {
        //include_once 'conection.php';

        $id = $this->getID();

        $stmt = $this->conn->prepare("SELECT * FROM topics "
        . "WHERE ID_TOPIC = $id");

        $stmt->execute();
        
        $results = $stmt->fetchAll(PDO::FETCH_ASSOC);
        $json = json_encode($results);

        return($json);
    }
}
