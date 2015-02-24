<?php
 /**
 * @file UserController.php
 * @author macherif <maccherif2001@gmail.com>
 * @copyright This App is builded only for test purpose requested by ASWAT TELECOM DEV TEAM 2015
 * @version 1 <This's the first release  >
 * @package Controllers
 * @return object < User Controller>
 * @todo
 */

 namespace Application\Controllers;
 use Application\Mappers\UserMapper as UserMapper;
 class UserController {
     public function __construct ()
     {
         
     }
     
     public function authentication ($params){
         $mapper = new UserMapper();
         
         $response =  $mapper->authenticate ($params['username'], $params['password']);
         
         return is_null($response) ? array('error'=> true, 'msg' => 'Login Failed: Incorrect Username or Password') : array(
                                                                                            'succes'=>true,
                                                                                            'data'=>$response);
         
     }
     public function register ($params){
         $mapper = new UserMapper();
         
         $response =  $mapper->register ($params);
         
         return json_encode($response);
         
     }
     public function fetch ($params){
         $mapper = new UserMapper();
         
         if(!empty($params['id'])){
             $response =  array($mapper->getOne($params['id']));
         }else{
             $response =  $mapper->fetch();
         }
         
         return $response ;
         
     }
     public function update ($params){
         $mapper = new UserMapper();
             $response =  array($mapper->update($params));
         return $response ;
         
     }
     public function delete ($params){
         $mapper = new UserMapper();
             $response =  array($mapper->deleteUser($params['id']));
         return $response ;
         
     }
 } 