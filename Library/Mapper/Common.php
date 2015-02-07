<?php

/**
 * @package Library
 * @subpackage Mapper
 * Description of common
 * @author maccherif <maccherif2001@gmail.com>
 */
 namespace Library\Mapper;
 use Library\Mapper\CommonInterface as Custom_Mapper_CommonInterface;
 use Api\Database\MysqliDb as DB;
 use Library\Config\Configuration;
 
abstract class Custom_Mapper_Common implements Custom_Mapper_CommonInterface {

    protected $_dbTable;
    public $config;
    public $db;
    protected $_tableName;
    protected $_modelSetters = array();
    protected $_modelGetters = array();
    //All fields created in physical db table
    protected $_attributes = array();

    abstract public function __construct();

    abstract public function getDbTable();
    
    abstract public function _hydrate($row);

    public function getDbShema()
    {
        return $this->_attributes;
    }
	
	public function populateForm($id)
    {
        $planning = $this->find($id);
        $data = array();
        $attributes = array_keys($this->getDbShema());
        $getters = $this->generateModelGetters();
        foreach ($attributes as $iterator => $field) {
            $data[$field] = $planning->$getters[$iterator]();
        }
        return $data;
    }
    /**
     * Get an array of objects
     * @access public
     * @return array of objects
     */
   abstract public function fetchAll()
    {
        $resultSet = $this->getDbTable()->fetchAll();
        $entries = array();
        foreach ($resultSet as $row) {
            $entries[] = $this->_hydrate($row);
        }
        return $entries;
    }


    /**
     * Similar to getElementById
     * @param int $id
     * @return build the video object
     */
    public function find($id)
    {
        $result = $this->getDbTable()->find($id);
        if (0 == count($result)) {
            //die("User does not exist");
            return false;
        }
        $row = $result->current();
        return $this->_hydrate($row);
    }

    /**
     * toCamelCase
     */
    public function toCamelCase($str)
    {
        $strNoUnderScore = str_replace('_', ' ', trim($str));
        $strCapitalize = ucwords($strNoUnderScore);             // Hello World
        $strNoblanks = str_replace(' ', '', trim($strCapitalize));  // HelloWorld
        $strCamelCase = lcfirst($strNoblanks); // helloWorld
        return $strCamelCase;
    }

    /**
     * AUTO DETECT AND GENERATE AN ARRAY OF CURRENT MODEL SETTERS
     */
    public function generateModelSetters()
    {
        if (count($this->_modelSetters))
            return $this->_modelSetters;
        $fieldsNames = array_keys($this->getDbShema());
        foreach ($fieldsNames as $field) {
            $camelCase = $this->toCamelCase($field);
            $this->_modelSetters[] = 'set' . ucfirst($camelCase);
        }
        return $this->_modelSetters;
    }

    /**
     * AUTO DETECT AND GENERATE AN ARRAY OF CURRENT MODEL GETTERS
     */
    public function generateModelGetters()
    {
        if (count($this->_modelGetters))
            return $this->_modelGetters;
        $fieldsNames = array_keys($this->getDbShema());
        foreach ($fieldsNames as $field) {
            $camelCase = $this->toCamelCase($field);
            $this->_modelGetters[] = 'get' . ucfirst($camelCase);
        }
        return $this->_modelGetters;
    }

    //delete

    public function delete($id)
    {
        $$this->getDb()->where ('id', $id);
        $this->getDb()->delete($this->getDbTable());
    }

    /**
     * Insert and update object
     * if $id == null execute insert action
     * else execute update action
     * @param int $id
     * @param $buisnessObject
     * @return the $buisnessObject object with last inserted id
     */
    public function save($buisnessObject)
    {
        $data = array();
        $attributes = array_keys($this->getDbShema());
        $getters = $this->generateModelGetters();
        foreach ($attributes as $iterator => $field) {
            $data[$field] = $buisnessObject->$getters[$iterator]();
        }
        if (null === $buisnessObject->getId()) {
            unset($data['id']);
            $lastInsertedId = $this->getDbTable()->insert($this->getDbTable, $data);
            $buisnessObject->setId($lastInsertedId);
            return $buisnessObject;
        } else {
            $this->getDb()->where ('id', $id);
            $this->getDb()->update($this->getDbTable, $data);
        }
    }
    
    /**
     * @see Api\Database\MysqliDb
     */
    public function getDb()
    {
        if(NULL === $this->db){
        $this->config = Configuration::getInstance();
        $this->db = new DB($this->config->host,$this->config->user,$this->config->pwd,$this->config->db,$this->config->port);
        }
        return $this->db;
    }

}

?>
