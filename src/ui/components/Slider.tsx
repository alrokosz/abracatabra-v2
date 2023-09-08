import * as Slider from '@radix-ui/react-slider';
import '../../styles/Slider.scss';

type SliderProps = {
  min: number;
  max: number;
  defaultValue: number;
  step?: number;
  orientation?: string;
  onValueCommit?: (value: number[]) => void;
  onValueChange?: (value: number[]) => void;
};

// eslint-disable-next-line react/display-name
export default function ({
  min,
  max,
  defaultValue,
  step = 1,
  orientation = 'vertical',
  onValueChange
}: SliderProps) {
  return (
    <form className="slider">
      <Slider.Root
        className="SliderRoot"
        defaultValue={[defaultValue]}
        max={max}
        min={min}
        step={step}
        onValueChange={(value) => onValueChange(value)}
      >
        <Slider.Track className="SliderTrack">
          <Slider.Range className="SliderRange" />
        </Slider.Track>
        <Slider.Thumb className="SliderThumb" aria-label="Hours" />
      </Slider.Root>
    </form>
  );
}
