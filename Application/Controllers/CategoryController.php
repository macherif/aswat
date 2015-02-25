<?php
 /**
 * @file CategoryController.php
 * @author macherif <maccherif2001@gmail.com>
 * @copyright This App is builded only for test purpose requested by ASWAT TELECOM DEV TEAM 2015
 * @version 1 <This's the first release  >
 * @package Controllers
 * @return object < Category Controller>
 * @todo
 */

 namespace Application\Controllers;
 use Application\Mappers\CategoryMapper as CategoryMapper;
 class CategoryController {
     public function __construct ()
     {
         
     }
     public function fetch ($params){
         $mapper = new CategoryMapper();
         
         if(!empty($params['id'])){
             $response =  array($mapper->getOne($params['id']));
         }else{
             $response =  $mapper->fetch();
         }
         
         return $response ;
         
     }
     public function update ($params){
         $mapper = new CategoryMapper();
             $response =  array($mapper->update($params));
         return $response ;
         
     }
     public function delete ($params){
         $mapper = new CategoryMapper();
             $response =  array($mapper->deleteCategory($params['id']));
         return $response ;
         
     }
    public function add ($params){
         $mapper = new CategoryMapper();
             $response =  array($mapper->add($params));
         return $response ;
     }
 } 