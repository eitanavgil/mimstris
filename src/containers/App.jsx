import React from 'react';
import { connect } from 'react-redux';
import config from '../config.js';
import { undoLastPiece } from '../stores/history.js';
import { getGameState, GAME_STATE_PAUSED, GAME_STATE_INIT } from '../stores/gameState.js';
import { getPlayMusic } from '../stores/config.js';

import Game from './Game';
import Scoreboard from './Scoreboard';
import NextPiece from './NextPiece';
import Music from './Music';

const [BOARD_WIDTH, BOARD_HEIGHT] = config.boardSize;
const CANVAS_WIDTH = BOARD_WIDTH * config.blockSize;
const CANVAS_HEIGHT = BOARD_HEIGHT * config.blockSize;
const NEXT_WIDTH = 4 * config.blockSize;
const NEXT_HEIGHT = 5 * config.blockSize;

const mapStateToProps = state => ({
	musicPlaying:
		getPlayMusic(state) && getGameState(state) !== GAME_STATE_INIT && getGameState(state) !== GAME_STATE_PAUSED,
});

const mapDispatchToProps = dispatch => ({
	onUndoClick: () => {
		dispatch(undoLastPiece());
	},
});

const App = props => (
	<div className="app">
		<div className="gameWrapper" style={{ width: CANVAS_WIDTH, height: CANVAS_HEIGHT }}>
			<Game width={CANVAS_WIDTH} height={CANVAS_HEIGHT} />
			<NextPiece width={NEXT_WIDTH} height={NEXT_HEIGHT} />
			<Scoreboard />
			<Music isPlaying={props.musicPlaying} />
		</div>
	</div>
);

export default connect(mapStateToProps, mapDispatchToProps)(App);
