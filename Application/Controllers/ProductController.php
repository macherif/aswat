<?php
 /**
 * @file ProductController.php
 * @author macherif <maccherif2001@gmail.com>
 * @copyright This App is builded only for test purpose requested by ASWAT TELECOM DEV TEAM 2015
 * @version 1 <This's the first release  >
 * @package Controllers
 * @return object < Product Controller>
 * @todo
 */

 namespace Application\Controllers;
 use Application\Mappers\ProductMapper as ProductMapper; 
 class ProductController {
     public function __construct ()
     {
         
     }
     public function fetch ($params){
         $mapper = new ProductMapper();
         
         if(!empty($params['id'])){
             $response =  array($mapper->getOne($params['id']));
         }else{
             $response =  $mapper->fetch();
         }
         
         return $response ;
         
     }
     public function update ($params){
         $mapper = new ProductMapper();
             $response =  array($mapper->update($params));
         return $response ;
         
     }
     public function delete ($params){
         $mapper = new ProductMapper();
             $response =  array($mapper->deleteProduct($params['id']));
         return $response ;
         
     }
    public function add ($params){
         $mapper = new ProductMapper();
             $response =  array($mapper->add($params));
         return $response ;
     }
 } 