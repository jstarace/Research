import React from 'react';

const articleColumns = [
    {name: "TITLE", uid: "title", sortable: true},,
    {name: "PUBLICATIONDATE", uid: "date", sortable: true},
    {name: "PUBLICATIONTYPE", uid: "type", sortable: true},
    {name: "ACTION", uid: "action", sortable: false}
]

const statusOptions = [
    {name: "Approved", uid: "approved"},
    {name: "Rejected", uid: "rejected"},
    {name: "Pending Review", uid: "pendingReview"},
  ];

export {articleColumns, statusOptions};