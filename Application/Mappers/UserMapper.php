<?php
 /**
 * @file userMapper.php
 * @author macherif <maccherif2001@gmail.com>
 * @copyright This App is builded only for test purpose requested by ASWAT TELECOM DEV TEAM 2015
 * @version 1 <This's the first release  >
 * @package mappers
 * @return object < User Mapper>
 * @todo
 */
 namespace Application\Mappers;
use Library\Mapper\Common as Custom_Mapper_Common; 
use Application\Models\User;
use Application\Mappers\ImageMapper;
class UserMapper extends Custom_Mapper_Common {
    // __construct function overload to define type of storage.
    public function __construct()
    {
        $this->_tableName = 'users';
        $this->_attributes = array(
            'id' => null,
            'login' => null,
            'password' => null,
            'email' => null,
            'created' => null,
            'enabled' => null,
            'image_id' => null,
            'role_id' => null,
        );
    }
    /**
     * Get registered DB instance to add the used database table
     * @return DB instance
     */
    public function getDbTable()
    {
        if (null === $this->_tableName) {
            $this->_tableName('users');
        }
        return $this->_tableName;
    }
    /**
     * Build a buisness object from an array
     * @param array $row
     * @return \Application_Models_User
     */
    public function _hydrate($row)
    {
        $user = new User();
        $attributes = array_keys($this->getDbShema());
        $setters = $this->generateModelSetters();
        foreach ($attributes as $iterator => $attribut) {
            $user->$setters[$iterator]($row->$attribut);
        }
        return $user;
    }
    public function authenticate ($username, $password){
        
    $this->getDb()->where ("login = '" . $username . "' OR email = '". $username . "'");
    $this->getDb()->where ("password", md5($username));
    $row = $this->getDb()->getOne ("users");
    //var_dump($_FILES);
    //die($this->getDb()->getLastQuery());
    //
    return $row ? $row : null;
    }
    public function register ($params){
        $row = (array) json_decode($params['data']);
        $row['created'] = time();
        $row['enabled'] = '1';
        $row['image_id'] = '0';
        $row['role_id'] = '2';  
      /**
       * @todo
       * Validation if pseudo or email already exists
       */
        $imageMapper = new ImageMapper(); 
        //var_dump($_FILES);
       $imageObj = $imageMapper->upload($_FILES['file'],$row['created']);
       $userObj = new User();
       $userObj ->setCreated($row['created'])
                ->setEnabled($row['enabled'])
                ->setImageId($row['image_id'])
                ->setRoleId($row['role_id'])
                ->setLogin($row['login'])
                ->setPassword(md5($row['password']))
                ->setEmail($row['email']);
       //$userObj = $this->save($userObj);
       $imageObj->setAlt('Picture of ' . $userObj->getLogin());
       $imageObj->setTitle('Picture of ' . $userObj->getLogin());
       $imageObj->setWidth('');
       $imageObj->setHeight('');
       $imageObj = $imageMapper->save($imageObj);
       $userObj->setImageId($imageObj->getId());
       //var_dump($imageObj->getId());
       $this->save($userObj);
       return array('success'=>true,
         'data'=>array(
            'username'=> $userObj->getLogin(),
            'image' => $userObj->getImageId(),
            'role' => $userObj->getRoleId() == 2 ? 'customer' : 'admin',
         )
         );
    }
}