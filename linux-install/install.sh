read -p "Do you wish to install the dependences?[Y/n]" -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]
then
  read -p "Do you wish to install go 1.8?[Y/n]" -n 1 -r
  echo
  if [[ $REPLY =~ ^[Yy]$ ]]
  then
    echo "Installing go 1.8"
    sudo apt-get install golang-1.8-go
    echo "Ok"
  fi

  read -p "Do you wish to get the mgo.v2 package?[Y/n]" -n 1 -r
  echo
  if [[ $REPLY =~ ^[Yy]$ ]]
  then
    echo "Getting mgo.v2 package"
    go get gopkg.in/mgo.v2
    echo "Ok"
  fi

  read -p "Do you wish to get the mgo.v2/bson package?[Y/n]" -n 1 -r
  echo
  if [[ $REPLY =~ ^[Yy]$ ]]
  then
    echo "Getting mgo.v2/bson"
    go get gopkg.in/mgo.v2/bson
    echo "Ok"
  fi

  read -p "Do you wish to install the MongoDB?[Y/n]" -n 1 -r
  echo
  if [[ $REPLY =~ ^[Yy]$ ]]
  then
    if [[ `lsb_release -rs` == "12.04" ]]
    then
      echo "deb [ arch=amd64 ] http://repo.mongodb.org/apt/ubuntu precise/mongodb-org/3.4 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-3.4.list
    fi

    if [[ `lsb_release -rs` == "14.04" ]]
    then
      echo "deb [ arch=amd64 ] http://repo.mongodb.org/apt/ubuntu trusty/mongodb-org/3.4 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-3.4.list
    fi

    if [[ `lsb_release -rs` == "16.04" ]]
    then
      echo "deb [ arch=amd64,arm64 ] http://repo.mongodb.org/apt/ubuntu xenial/mongodb-org/3.4 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-3.4.list
    fi

    sudo apt-get update
    sudo apt-get install -y mongodb-org
  fi
fi
