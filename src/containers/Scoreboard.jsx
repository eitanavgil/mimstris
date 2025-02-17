import React from 'react';
import { connect } from 'react-redux';
import commaNumber from 'comma-number';
import { getLevel } from '../stores/level';
import { getLines } from '../stores/lines';
import { getScore } from '../stores/score';

import ScoreboardText from '../components/ScoreboardText';

const mapStateToProps = state => ({
	level: commaNumber(getLevel(state)),
	lines: commaNumber(getLines(state)),
	score: commaNumber(getScore(state)),
});

const Scoreboard = props => (
	<div className="scoreboard">
		<ScoreboardText label="נִקּוּד" value={props.score} />
	</div>
);

export default connect(mapStateToProps)(Scoreboard);
