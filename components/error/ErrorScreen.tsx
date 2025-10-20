import React from 'react';
import { View, Text } from 'react-native';
import LottieView from 'lottie-react-native';

const LoadingScreen = () => {
  return (
    <View className="flex-1 items-center justify-center">
      <Text className="mt-3 text-3xl font-bold text-white">No Weather Data</Text>
      <LottieView
        source={require('../../assets/animations/empty.json')}
        autoPlay
        loop
        style={{ width: 450, height: 450 }}
      />
    </View>
  );
};

export default LoadingScreen;
