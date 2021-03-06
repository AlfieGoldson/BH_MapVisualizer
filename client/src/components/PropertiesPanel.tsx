import formStyles from '../styles/Forms.module.scss';
import React, { useContext, useState } from 'react';
import { EditorStateContext } from '../providers/EditorStateProvider';
import { MapNodesContext } from '../providers/MapNodesProvider';
import styles from '../styles/PropertiesPanel.module.scss';
import { parseMapXML } from '../util/parseMapXML';
import { CollisionSettings } from './CollisionSettings';
import { TreeView } from './TreeView';
import { Resizable } from './Resizable';

export function PropertiesPanel() {
	const { mapData, setMapData } = useContext(MapNodesContext);

	const {
		setTheme,
		showCollisions,
		setShowCollisions,
		showMapBounds,
		setShowMapBounds,
		theme: currentTheme,
		setLoadedNewMap,
	} = useContext(EditorStateContext);

	// function getRandomCol(): Collision {
	// 	return {
	// 		id: Math.random().toString(),
	// 		type: 'Hard',
	// 		isDragging: false,
	// 		x1: Math.round(Math.random() * 250 + 250),
	// 		x2: Math.round(Math.random() * 250 + 250),
	// 		y1: Math.round(Math.random() * 250 + 250),
	// 		y2: Math.round(Math.random() * 250 + 250),
	// 	};
	// }

	return (
		<Resizable minWidth={100} maxWidth={480} widthThreshold>
			<div className={styles.container}>
				{/* <button
				className={btnStyles.button}
				onClick={() => addCollision(getRandomCol())}
			>
				Add Collision
			</button> */}
				<input
					className={formStyles.input}
					style={{ cursor: 'pointer' }}
					type='file'
					name='mapFile'
					onChange={async (e) => {
						if (e.target.files.length <= 0) return;
						const file = e.target.files[0];
						setMapData(parseMapXML(await file.text()));
						setLoadedNewMap(true);
					}}
				/>
				<select
					className={formStyles.input}
					onChange={(e) => {
						setTheme(e.target.value);
					}}
					value={currentTheme}
				>
					<option value=''>None</option>
					{mapData.themes.map((theme) => (
						<option value={theme} key={theme}>
							{theme}
						</option>
					))}
				</select>
				<label className={formStyles.label}>
					Show Collisions
					<input
						type='checkbox'
						checked={showCollisions}
						onChange={(e) => setShowCollisions(e.target.checked)}
					/>
				</label>
				<label className={formStyles.label}>
					Show Map Bounds
					<input
						type='checkbox'
						checked={showMapBounds}
						onChange={(e) => setShowMapBounds(e.target.checked)}
					/>
				</label>
				<TreeView />
			</div>
		</Resizable>
	);
}
