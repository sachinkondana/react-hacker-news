import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import _ from './Utils.js';

import './icons/style.css';
import styles from './NewsTable.module.scss';

const tableKey = 'created_at_i';

const getPointHighlighterClass = (point) => {
    if (point > 100) return styles.goodRating;
    if (point > 50) return styles.avgRating;
};

function NewsTable(props) {
    const { data } = props;

    const renderNewDeatils = (d) => {
        return (
            <>
                <span>{d.title}</span>
                <a className={styles.secondary} href={d.url} rel="noopener noreferrer external" target="_blank">({_.getHostname(d.url)})</a>
                <span className={styles.byTxt}>by</span>
                <span>{d.author}</span>
                <span className={styles.secondary}>{moment(d.created_at).startOf('day').fromNow()}</span>
                <span className={styles.hideTxt}>hide</span>
            </>
        );
    };

    const renderVoteCount = (d) => {
        return (
            <span className={getPointHighlighterClass(d.points)}>{d.points}</span>
        );
    };

    const tableData = [{
        name: 'Comments',
        key: 'num_comments',
    }, {
        name: 'Vote count',
        render: renderVoteCount,
    }, {
        name: 'Up Vote',
        render: () => <span className="icon-thumb_up_alt"></span>
    }, {
        name: 'News details',
        key: 'points',
        render: renderNewDeatils,
    }]

    const renderHeader = tableData.map((d, i) => {
        return (
            <th key={i}>{d.name}</th>
        );
    });

    const rednerEmpty = () => {
        return <tr><td>No data</td></tr>;
    };

    const renderRows = _.isEmpty(data)
        ? rednerEmpty()
        : data.map(d => {
            const rowKey = d[tableKey];
            const rowContent = tableData.map(({ render, key }, i) => {
                const cellKey = { key: `${i}-${rowKey}-${key}` };

                if (render) {
                    return <td {...cellKey}>{render(d)}</td>;
                }

                return (
                    <td {...cellKey}>{_.get(d, `${key}`)}</td>
                );
            });

            return <tr key={rowKey}>{rowContent}</tr>
        });

    return (
        <table className={styles.tbl}>
            <thead>
                <tr>{renderHeader}</tr>
            </thead>
            <tbody>
                {renderRows}
            </tbody>
        </table>
    );
}


NewsTable.propTypes = {
    data: PropTypes.array,
};

NewsTable.defaultProps = {
    data: [],
};


export default NewsTable;
