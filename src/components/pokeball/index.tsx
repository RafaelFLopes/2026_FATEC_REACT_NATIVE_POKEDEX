import { View } from 'react-native';

type Props = {
  size: number;
};

export function Pokeball({ size }: Props) {
  const half = size / 2;
  const lineH = Math.max(3, size * 0.055);
  const btnR = size * 0.15;
  const borderW = Math.max(2, size * 0.045);

  return (
    <View
      style={{
        width: size,
        height: size,
        borderRadius: half,
        overflow: 'hidden',
        borderWidth: borderW,
        borderColor: '#0D0D1F',
      }}
    >
      <View style={{ width: size, height: half, backgroundColor: '#E53935' }} />
      <View style={{ width: size, height: half, backgroundColor: '#ECEFF1' }} />
      <View
        style={{
          position: 'absolute',
          top: half - lineH / 2,
          left: 0,
          right: 0,
          height: lineH,
          backgroundColor: '#0D0D1F',
        }}
      />
      <View
        style={{
          position: 'absolute',
          top: half - btnR,
          left: half - btnR,
          width: btnR * 2,
          height: btnR * 2,
          borderRadius: btnR,
          backgroundColor: '#ECEFF1',
          borderWidth: borderW,
          borderColor: '#0D0D1F',
        }}
      />
    </View>
  );
}
