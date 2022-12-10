let id = 0;
const createPiece = (name, color, matrix) => {
	id++;
	// Map any non-zero values in the matrix to the id number for this piece.
	matrix = matrix.map(row => row.map(value => (value === 0 ? 0 : id)));

	return {
		name,
		id,
		color,
		matrix,
		x: 0,
		y: 0,
	};
};

const pieces = [
	// STANDARD PIECES
	createPiece('T', '#2A301E', [
		[0, 0, 0],
		[1, 1, 1],
		[0, 1, 0],
	]),
	createPiece('O', '#2A301E', [
		[1, 1],
		[1, 1],
	]),
	createPiece('J', '#2A301E', [
		[0, 1, 0],
		[0, 1, 0],
		[1, 1, 0],
	]),
	createPiece('L', '#2A301E', [
		[0, 1, 0],
		[0, 1, 0],
		[0, 1, 1],
	]),
	createPiece('I', '#2A301E', [
		[0, 1, 0],
		[0, 1, 0],
		[0, 1, 0],
		[0, 1, 0],
	]),
	createPiece('S', '#2A301E', [
		[0, 1, 1],
		[1, 1, 0],
	]),
	createPiece('Z', '#2A301E', [
		[1, 1, 0],
		[0, 1, 1],
	]),
	// EXTENDED PIECES
	createPiece('U', '#2A301E', [
		[1, 0, 1],
		[1, 1, 1],
		[0, 0, 0],
	]),
	createPiece('P', '#2A301E', [
		[0, 0, 0, 0],
		[0, 1, 1, 0],
		[0, 1, 1, 0],
		[0, 1, 0, 0],
	]),
	createPiece('H', '#2A301E', [
		[1, 0, 1],
		[1, 1, 1],
		[1, 0, 1],
	]),
	createPiece('Y', '#2A301E', [
		[1, 0, 1],
		[1, 1, 1],
		[0, 1, 0],
	]),
	createPiece('X', '#2A301E', [
		[0, 1, 0],
		[1, 1, 1],
		[0, 1, 0],
	]),
	createPiece('#', '#2A301E', [
		[1, 1, 1],
		[1, 0, 1],
		[1, 1, 1],
	]),
	createPiece('|', '#2A301E', [
		[0, 1, 0],
		[0, 1, 0],
		[0, 1, 0],
		[0, 1, 0],
		[0, 1, 0],
		[0, 1, 0],
	]),
];

export default pieces;

/**
 * Returns all the piece names as a single string.
 */
export const allPieceNames = (() => pieces.map(piece => piece.name).join(''))(); // <-- Notice, immediately invoked since this value only needs to be calculated once.
