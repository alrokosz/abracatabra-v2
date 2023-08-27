import * as Slider from '@radix-ui/react-slider';
import '../../styles/Slider.scss';

type SliderProps = {
  min: number;
  max: number;
  defaultValue: number;
  step?: number;
  orientation?: string;
  onValueCommit: (value: number[]) => void;
};

export default function ({
  min,
  max,
  defaultValue,
  step = 1,
  orientation = 'vertical',
  onValueCommit
}: SliderProps) {
  return (
    <form className="slider">
      <Slider.Root
        className="SliderRoot"
        defaultValue={[defaultValue]}
        max={max}
        min={min}
        step={step}
        onValueCommit={(value) => onValueCommit(value)}
      >
        <Slider.Track className="SliderTrack">
          <Slider.Range className="SliderRange" />
        </Slider.Track>
        <Slider.Thumb className="SliderThumb" aria-label="Hours" />
      </Slider.Root>
    </form>
  );
}
