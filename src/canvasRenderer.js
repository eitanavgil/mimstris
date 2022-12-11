import find from 'lodash/fp/find';
import memoize from 'lodash/fp/memoize';

import config from './config.js';
import pieceLibrary from './pieceLibrary.js';

import store from './stores';
import { getMidnightMode } from './stores/config';
const isMidnightMode = () => getMidnightMode(store.getState());

/**
 * Gets the color associated with the piece's id.
 * Memoized for performance (roughly doubles speed of draw!)
 *
 * Why not just save the color to the piece matrix? I thought it would
 * be nice to be able to change the colors during gameplay, for example,
 * a pallete swap on each new level!
 */
const getColorForID = memoize(id => {
	return find({ id: id })(pieceLibrary).color;
});

/**
 * Resets the canvas so it will be ready to have freshly drawn pieces.
 */
function clearCanvas(context, color) {
	context.fillStyle = color;
	context.fillRect(0, 0, context.canvas.width, context.canvas.height);
}

/**
 * Draws helpful lines on the board to help the player determine where the
 * piece will end up.
 */
function drawGuideLines(context) {
	const { height: CANVAS_HEIGHT } = context.canvas;
	const [BOARD_WIDTH] = config.boardSize;
	let x = 0;

	// make backgroung pattern here
	context.fillStyle = config.guideColor;
	while (x < BOARD_WIDTH) {
		if (x % 2 === 0) {
			context.fillRect(x * config.blockSize, 0, config.blockSize, CANVAS_HEIGHT);
		}
		x++;
	}
}

/**
 * Renders a matrix (of color ids) to the context.
 */
function drawMatrix(context, matrix, offsetX = 0, offsetY = 0) {
	matrix.map((column, columnIndex) => {
		column.map((value, rowIndex) => {
			if (value !== 0) {
				drawBlock(context, rowIndex + offsetX, columnIndex + offsetY, getColorForID(value));
			}
		});
	});
}

/**
 * Draw a board matrix.
 */
function drawBoard(context, board) {
	drawMatrix(context, board, 0, 0);
}

/**
 * Draw a single piece (usually current or next)
 */
function drawPiece(context, piece) {
	drawMatrix(context, piece.matrix, piece.x, piece.y);
}

const sm1 = 0.25;
const sm2 = 0.75;

const ssm1 = 0.15;
const ssm2 = 0.85;

/**
 * Draw a single block. Each matrix (board or piece) is composed of many blocks.
 */
function drawBlock(context, row, column, color, outlinePieces = true) {
	// Scale up coordinates
	const x = row * config.blockSize;
	const y = column * config.blockSize;
	const width = config.blockSize;
	const height = config.blockSize;

	// fill block
	context.fillStyle = color;

	context.fillRect(x, y, width, height);

	// outline block
	context.beginPath();
	context.strokeStyle = config.backgroundColor;
	context.lineWidth = config.blockSize * config.outlineThickness;
	context.moveTo(x, y);
	context.lineTo(x + width, y);
	context.lineTo(x + width, y + height);
	context.lineTo(x, y + height);
	context.lineTo(x, y);
	context.stroke();

	// highlight blockSize
	if (config.showBlockHighlight) {
		context.beginPath();
		context.globalAlpha = 0.8;
		context.fillStyle = '#9ead86';
		context.moveTo(x + width * ssm1, y + height * ssm1);
		context.lineTo(x + width * ssm1, y + height * ssm2);
		context.lineTo(x + width * ssm2, y + height * ssm2);
		context.lineTo(x + width * ssm2, y + height * ssm1);
		context.fill();

		context.globalAlpha = 1.0;
	}
	if (config.showBlockHighlight) {
		context.beginPath();
		context.globalAlpha = 0.8;
		context.fillStyle = '#000000';
		context.moveTo(x + width * sm1, y + height * sm1);
		context.lineTo(x + width * sm1, y + height * sm2);
		context.lineTo(x + width * sm2, y + height * sm2);
		context.lineTo(x + width * sm2, y + height * sm1);
		context.fill();

		context.globalAlpha = 1.0;
	}
}

/**
 * Clears then renders the entire board and current piece to the context.
 */
function drawGame(context, board, currentPiece) {
	if (!board || !board[0]) {
		throw new Error('"board" is not defined.');
	}
	if (!currentPiece) {
		throw new Error('"currentPiece" is not defined.');
	}
	if (!context) {
		throw new Error('Canvas "context" is not defined.');
	}

	clearCanvas(context, config.backgroundColor);

	if (config.showGuideLines && !isMidnightMode()) {
		drawGuideLines(context);
	}

	drawBoard(context, board);
	drawPiece(context, currentPiece);
}

export default {
	drawGame,
	drawMatrix,
	clearCanvas,
};
