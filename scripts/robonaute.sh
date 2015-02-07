#!/bin/bash

_help()
{
	echo ;
	echo "$0 is a MySQL set up and configuration builder for ASWAT TEST Application. By default all sections are executed." ;
	echo ;
	exit 1 ;
}


# Execute all sql files
for i in `ls raw*`; do echo "execute $i"; mysql -uraw -praw -D raw < $i; done

#mysql -uasswat -passwat -D asswat < asswat.sql

echo ""

exit 0