import {SafeAreaView} from 'react-native-safe-area-context';
import Header from '../../Components/Header';
import {HomeStyle} from './HomeStyle';
import React from 'react';
import {Text} from 'react-native';
export default function () {
  return (
    <SafeAreaView style={HomeStyle.container}>
      <Header />
      <Text style={HomeStyle.headingText}> Recommended For You</Text>
    </SafeAreaView>
  );
}
