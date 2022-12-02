import React from 'react';
import { Text, View } from 'react-native';

import { Colors } from '../../../../utils/colors';

import { styles } from './ListItem.styles';

type ListItemProps = {
  title: string;
  description: string;
  backgroundColor: Partial<Colors>;
};

export const ListItem: React.FC<ListItemProps> = ({
  title,
  description,
  backgroundColor,
}) => {
  return (
    <View style={[styles.container, { backgroundColor }]}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>
        {!description ? 'unknown' : description}
      </Text>
    </View>
  );
};
