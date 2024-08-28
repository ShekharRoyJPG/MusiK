import {StyleSheet, Text, View, TouchableOpacity, FlatList} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {colors} from '../Constants/colors';
import AntDesign from 'react-native-vector-icons/AntDesign';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import {fontSize, iconSizes, spacing} from '../Constants/dimensions';
import {fontFamilies} from '../Constants/fonts';
import SongCard from '../../Components/SongCard';
import {useNavigation} from '@react-navigation/native';
import {useLikeSongs} from '../store/likeStore';
const LikeScreen = () => {
  const navigation = useNavigation();
  const {likedSongs} = useLikeSongs();
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <AntDesign
            name="arrowleft"
            size={iconSizes.md}
            color={colors.textPrimary}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <SimpleLineIcons
            name="equalizer"
            size={iconSizes.md}
            color={colors.textPrimary}
          />
        </TouchableOpacity>
      </View>
      <FlatList
        ListHeaderComponent={
          <Text style={styles.headingText}>Liked Songs</Text>
        }
        data={likedSongs}
        renderItem={({item}) => (
          <SongCard
            containerStyle={{width: '47%'}}
            imageStyle={{height: 160, width: 160}}
            item={item}
          />
        )}
        numColumns={2}
        columnWrapperStyle={{
          justifyContent: 'space-between',
          marginVertical: spacing.lg,
        }}
        contentContainerStyle={{
          paddingBottom: 500,
          paddingHorizontal: spacing.lg,
        }}
      />
    </SafeAreaView>
  );
};

export default LikeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  headingText: {
    fontSize: fontSize.xl,
    color: colors.textPrimary,
    fontFamily: fontFamilies.bold,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.sm,
  },
});
