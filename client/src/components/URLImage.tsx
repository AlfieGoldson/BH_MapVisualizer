import useImage from 'use-image';
import { Image } from 'react-konva';

interface Props extends Platform {
	url: string;
}

export function URLImage({ url, x, y, w, h, scaleX, scaleY, rotation }: Props) {
	const [img] = useImage(url);

	return (
		<Image
			image={img}
			x={x}
			y={y}
			width={w}
			height={h}
			scaleX={scaleX}
			scaleY={scaleY}
			rotation={rotation}
		/>
	);
}
