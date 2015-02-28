<?php
/**
 * @file Bootstrap.php
 * @author macherif <maccherif2001@gmail.com>
 * @copyright This App is builded only for test purpose requested by ASWAT TELECOM DEV TEAM 2015
 * @version 1 <This's the first release  >
 * @package Library
 * @subpackage Bootstrap
 * @return object < Bootstarp>
 * @todo
 */
namespace Library\Bootstrap;
class Bootstrap {
    public $params;
    var $controller;
    var $action;
    public function __construct() {
        if (isset($_SERVER["CONTENT_TYPE"]) && strpos($_SERVER["CONTENT_TYPE"], "application/json") !== false) {
            $_POST = array_merge($_POST, (array) json_decode(trim(file_get_contents('php://input')), true));
        }
        $this -> params = array_merge($_POST, $_GET);

    }

    public function run() {

        if (key_exists('ajax', $this -> params)) {
            $controller = 'Application\Controllers\\' . ucfirst($this -> params['controller'] . 'Controller');
            $this -> controller = new $controller();
            $action = $this -> params['action'];
            if(('Image' == ucfirst($this -> params['controller']) ) && ('ImgPath' == $this -> params['action'])){
                $path = $this -> controller -> $action($this -> params);
                //var_dump($path); die;
                $filename = basename($path[0]);
                $file_extension = strtolower(substr(strrchr($filename,"."),1));
                header('Content-type: image/' . $file_extension);
                readfile(realpath($path[0]));
            }else{
              header('Content-Type: application/json');
              echo json_encode($this -> controller -> $action($this -> params));  
            }
            
        } else {
            require_once 'Application/Views/header.php';
            require_once 'Application/Views/footer.php';
        }
    }

}
?>