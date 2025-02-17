import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {HomeStyle} from '../Scr/Screen/HomeStyle';
import {colors} from '../Scr/Constants/colors';
import {iconSizes} from '../Scr/Constants/dimensions';
import {useNavigation} from '@react-navigation/native';

export default function Header() {
  const navigation = useNavigation();
  return (
    <View style={HomeStyle.header}>
      <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
        <Ionicons
          name={'options-outline'}
          color={colors.iconPrimary}
          size={iconSizes.md}
        />
      </TouchableOpacity>
      <TouchableOpacity>
        <AntDesign
          name={'search1'}
          color={colors.iconPrimary}
          size={iconSizes.md}
        />
      </TouchableOpacity>
    </View>
  );
}
