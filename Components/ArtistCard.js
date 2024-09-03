import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {fontSize, spacing} from '../Scr/Constants/dimensions';
import {colors} from '../Scr/Constants/colors';
import {fontFamilies} from '../Scr/Constants/fonts';
import {FlatList} from 'react-native-gesture-handler';
import {Artists} from '../Scr/data/artists';
import Artist from './Artist';

export default function ArtistCard() {
  return (
    <View style={styles.container}>
      <Text style={styles.headingText}>Singers</Text>
      <FlatList
        data={Artists}
        renderItem={({item}) => <Artist item={item} />}
        horizontal={true}
        ItemSeparatorComponent={<View style={{marginHorizontal: 5}} />}
        contentContainerStyle={{
          paddingHorizontal: spacing.md,
          marginVertical: spacing.sm,
        }}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    paddingVertical: spacing.sm,
  },
  headingText: {
    fontSize: fontSize.xl,
    color: colors.textPrimary,
    fontFamily: fontFamilies.bold,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
});
