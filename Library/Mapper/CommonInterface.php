<?php
/**
 * @package Library
 * @subpackage Mapper
 * This's all method that must be declared on our common mapper
 * @see Custom_Mapper_Common
 * @author maccherif <maccherif2001@gmail.com>
 */
namespace Library\Mapper;

interface CommonInterface {

    public function getDbShema();

    //public function setDbTable($dbTable);

    public function fetchAll();

    //public function _hydrate($row);

    public function find($id);

    public function delete($id);

    public function toCamelCase($str);

    public function generateModelSetters();

    public function generateModelGetters();
}
