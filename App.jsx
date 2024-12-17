import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, FlatList, TextInput } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import profilepic from './assets/image1.png';

const App = () => {
  const [menuVisible, setMenuVisible] = useState(false);
  const [pinMenuVisible, setPinMenuVisible] = useState(false);
  const [messageInput, setMessageInput] = useState('');

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const togglePinMenu = () => {
    setPinMenuVisible(!pinMenuVisible);
  };

  const pinOptions = [
    { id: '1', icon: 'camera', label: 'Camera' },
    { id: '2', icon: 'videocam', label: 'Video' },
    { id: '3', icon: 'document-text', label: 'Note' },
  ];

  const menuOptions = [
    { id: '1', icon: 'person', label: 'Members' },
    { id: '2', icon: 'call', label: 'Share Number' },
    { id: '3', icon: 'chatbox-outline', label: 'Report' },
  ];

  const messages = [
    {
      id: '1',
      text: 'Connect with fellow travelers, share the ride and save money.',
      type: 'received',
      profilePic: profilepic,
    },
    { id: '2', text: 'Yes, it is available!', type: 'sent' },
    { id: '3', text: 'Great, I will join.', type: 'received', profilePic: profilepic },
    { id: '4', text: 'Looking forward to it!', type: 'sent' },
  ];

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Ionicons name="arrow-back" size={30} color="#000" />
        <Text style={styles.title}>Trip 1</Text>
        <FontAwesome5 name="edit" size={30} color="#000" />
      </View>

    
      {/* Menu Options */}
      {menuVisible && (
        <View style={styles.menu}>
          {menuOptions.map((option) => (
            <TouchableOpacity key={option.id} style={styles.menuOption}>
              <Ionicons name={option.icon} size={20} color="#000" />
              <Text style={styles.menuOptionText}>{option.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      {/* Trip Information */}
      <View style={styles.infoContainer}>
        <Image source={profilepic} style={styles.profileImage} />
        <View style={styles.infoTextContainer}>
          <Text style={styles.infoText}>From IGI Airport, T3</Text>
          <Text style={styles.infoText}>To Sector 28</Text>
        </View>
        <TouchableOpacity onPress={toggleMenu}>
          <Ionicons name="ellipsis-vertical" size={30} color="#000" />
        </TouchableOpacity>
      </View>
      
      <View style={styles.dateSeparatorContainer}>
        <View style={styles.line} />
        <Text style={styles.dateText}>12 JAN, 2023</Text>
        <View style={styles.line} />
      </View>

      {/* Chat Section */}
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View
            style={[
              styles.messageContainer,
              item.type === 'sent' ? styles.sentMessageContainer : styles.receivedMessageContainer,
            ]}
          >
            {item.type === 'received' && (
              <Image source={item.profilePic} style={styles.profileImageSmall} />
            )}
            <View style={styles.messageBox}>
              <Text style={styles.messageText}>{item.text}</Text>
            </View>
          </View>
        )}
      />

      {/* Reply Section */}
      <View style={styles.replyContainer}>
        <TextInput
          style={styles.replyInput}
          placeholder="Type a message"
          value={messageInput}
          onChangeText={setMessageInput}
        />
         <TouchableOpacity onPress={togglePinMenu}>
          <FontAwesome5 name="paperclip" size={25} color="#000" style={styles.pinIcon} />
        </TouchableOpacity>
        <Ionicons name="send" size={25} color="#000" style={styles.sendIcon} />
       
        {pinMenuVisible && (
          <View style={styles.pinMenu}>
            {pinOptions.map((option) => (
              <TouchableOpacity key={option.id} style={styles.pinOption}>
                <Ionicons name={option.icon} size={25} color="#fff" style={{margin:8}} />
                
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAF9F4',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  menu: {
    backgroundColor: '#fff',
    position: 'absolute',
    top: 110,
    right: 15,
    width: 160,
    borderRadius: 10,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    borderWidth: 1,
    borderColor: '#ccc',
    zIndex: 1,
  },
  menuOption: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  menuOptionText: {
    fontSize: 16,
  },

  dateSeparatorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#ccc',
  },

  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  infoTextContainer: {
    flex: 1,
  },
  infoText: {
    fontSize: 16,
  },
  messageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
    
  },
  sentMessageContainer: {
    justifyContent: 'flex-end',
    alignSelf: 'flex-end',
   
    marginRight: 10,
    borderTopLeftRadius:10,
    borderTopRightRadius:10,
    borderBottomLeftRadius:10,
  },
  receivedMessageContainer: {
    justifyContent: 'flex-start',
    alignSelf: 'flex-start',
    marginLeft: 10,
    backgroundColor:"#ffff",
   
  },
  profileImageSmall: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 10,
    marginTop:35,
  },
  messageBox: {
    backgroundColor: '#fff',
    padding: 10,
    borderTopLeftRadius:10,
    borderTopRightRadius:10,
    borderBottomRightRadius:10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    backgroundColor:'#1C63D5',
  },
  messageText: {
    fontSize: 16,
    color:"#ffff",
    fontWeight:"bold",
  },
  replyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
  replyInput: {
    flex: 1,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 20,
    marginRight: 10,
  },
  sendIcon: {
    marginLeft: 5,
  },
  pinIcon: {
    marginLeft: 5,
  },
  pinMenu: {
    display:'flex',
    flexDirection: 'row',
    position: 'absolute',
    bottom: 60,
    right:40,
    backgroundColor: 'green',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    borderBottomLeftRadius: 30,
    elevation: 5,
    padding: 12,
  },
  pinOption: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 3,
    borderRadius:10,
  },
  pinOptionText: {
    marginLeft: 10,
    fontSize: 14,
  },
});
export default App;
