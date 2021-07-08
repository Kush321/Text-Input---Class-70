import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import * as Permissions from 'expo-permissions';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { TextInput } from 'react-native-gesture-handler';

export default class BookTransactionScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      hasCameraPermissions: null,
      scanned: false,
      scannedData: '',
      buttonState: 'normal',
      scannedBookID: '',
      scannedStudentID: ''
    }
  }
  getCameraPermissions = async (id) => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState = ({
      hasCameraPermissions: status === "granted",
      buttonState: id,
      scanned: false
    })
  }
  handleBarcodeScanned = async ({ type, data }) => {
    const {buttonState} = this.state.buttonState
    if (buttonState === "BookID") {
      this.setState = ({
        scanned: true,
        scannedBookID: data,
        buttonState: 'normal'
      })
    }
    else if (buttonState === "StudentID") {
      this.setState = ({
        scanned: true,
        scannedStudentID: data,
        buttonState: 'normal'
      })
    }
  }
  render() {
    const hasCameraPermissions = this.state.hasCameraPermissions;
    const scanned = this.state.scanned;
    const buttonState = this.state.buttonState;
    if (buttonState === "clicked" && hasCameraPermissions) {
      return (
        <BarCodeScanner
          onBarcodeScanned={scanned ? undefined : this.handleBarcodeScanned}
          style={styles.absoluteFillObject}
        />
      );
    }
    else if (buttonState === "normal") {
      return (
        <View style={styles.container}>
          <Text style={styles.displayText}>
            {hasCameraPermissions === true ? this.state.scannedData : 'Request Camera Permissions'}
          </Text>
          <View>
            <Image
              source={require("../assets/booklogo.jpg")}
              style={{
                width: 200,
                height: 200,
              }} />
            <Text
              style={{
                textAlign: 'center',
                fontSize: 30,
              }}>
              Wily App
            </Text>
          </View>
          <View
            style={styles.inputView}>
            <TextInput
              style={styles.inputBox}
              placeholder="Book ID"
              value={this.state.scannedBookID}>

            </TextInput>
            <TouchableOpacity
              onPress={
                this.getCameraPermissions("BookID")
              }
              style={styles.scanButton}>
              <Text style={styles.buttonText}>
                Scan
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={styles.inputView}>
            <TextInput
              style={styles.inputBox}
              placeholder="Student ID"
              value={this.state.scannedStudentID}>

            </TextInput>
            <TouchableOpacity
              onPress={
                this.getCameraPermissions("StudentID")
              }
              style={styles.scanButton}>
              <Text style={styles.buttonText}>
                Scan
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    }
  }
}
const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  displayText: { fontSize: 15, textDecorationLine: 'underline' },
  scanButton: { backgroundColor: '#2196F3', padding: 10, margin: 10 },
  buttonText: { fontSize: 20 },
  inputView: { flexDirection: 'row', margin: 20 },
  inputBox: { width: 400, height: 40, borderWidth: 1.5, fontSize: 20, textAlignVertical: 'center' }
});
