import React from 'react';
import { render, waitFor } from '@testing-library/react'
import NewsTable from './NewsTable';

const mockData = [{
    author: "vezycash",
    created_at: "2020-06-14T08:50:43.000Z",
    created_at_i: 1592124643,
    num_comments: 478,
    objectID: "23516088",
    points: 617,
    title: "Google hides full addresses in URL bar on Chrome 85",
    url: "https://www.androidpolice.com/2020/06",
}];

const tableKey = 'objectID';
const upVoteStoreName = 'HACKER_upvote';

describe('NewsTable', () => {
    test('loads with empty data set', () => {
        const { getByTestId } = render(<NewsTable data={[]} />);

        // await waitFor(() => getByText('No data'));

        expect(getByTestId('message').textContent).toBe('No data');
        expect(getByTestId('prevBtn').disabled).toEqual(true);
        expect(getByTestId('nextBtn').disabled).toEqual(true);
    });


    test('loads with single data set', () => {
        const { getByText, getByTestId } = render(<NewsTable data={mockData} />);
        
        getByText(mockData[0]['title']);
        expect(getByTestId('prevBtn').disabled).toEqual(true);
        expect(getByTestId('prevBtn').disabled).toEqual(true);
    });

    test('fire upvote event once', () => {
        const { getByText, getByTestId } = render(<NewsTable data={mockData} />);
        const dataId = mockData[0][tableKey];
        
        getByTestId('upvote-'+dataId).click();
        const storeValue = JSON.parse(global.localStorage.getItem(upVoteStoreName));
        expect(storeValue[dataId]).toEqual(1);
    });

    test('fire upvote event twice', () => {
        const { getByTestId } = render(<NewsTable data={mockData} />);
        const dataId = mockData[0][tableKey];
        
        getByTestId('upvote-'+dataId).click();
        getByTestId('upvote-'+dataId).click();
        const storeValue = JSON.parse(global.localStorage.getItem(upVoteStoreName));
        expect(storeValue[dataId]).toEqual(3); // already fired once above
    });
});

