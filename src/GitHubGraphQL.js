import React from 'react';
import { Query } from 'react-apollo';
import { gql } from 'apollo-boost';
import IssueCard from './IssueCard';
import { DEFAULT_SEARCH_LIMIT, GITHUB_REPO_NAME } from './settings';

/**
 * Constructs GraphQL query for GitHub
 * 
 * @param {string} searchCriteria [optional] - Query string to search for in repo issues (eg. useEffect hooks)
 * @param {string} issueState [optional] - State of issue (eg. 'open' or 'closed')
 * @param {number} searchLimit [optional] - Number of issues (sorted by latest)
 * @param {string} repoName [optional] - Name of GitHub repo (eg. 'facebook/react')
 */
export const constructGraphQLQuery = ({searchCriteria='', issueState='', searchLimit=DEFAULT_SEARCH_LIMIT, repoName=GITHUB_REPO_NAME}) => (
  gql`
    query ReactIssueSearch {
      search(query: "repo:${repoName} state:${issueState} type:issue ${searchCriteria}", type:ISSUE, last: ${searchLimit}) {
        issueCount
        edges {
          node {
            ... on Issue {
              number
              title
              state
              createdAt
              author {
                login
              }
              url
              bodyHTML
              labels(first:5) {
                edges {
                  node {
                    name
                  }
                }
              }
            }
          }
        }
      }
    }`
);

/**
 * Component responsible for querying GitHub GraphQL API and constructing Material-UI Cards
 * 
 * @param {function} setQueryLoading [required] - Reach Hook setState used to pass loading state to parent
 * @param {function} setQueryResultSize [required] - Reach Hook setState used to pass result size to parent
 * @param {string} searchCriteria [optional] - Query string to search for in repo issues (eg. useEffect hooks)
 * @param {string} issueState [optional] - State of issue (eg. 'open' or 'closed')
 * @param {number} searchLimit [optional] - Number of issues (sorted by latest)
 * 
 * @returns {object} JSX list of MediaCards
 */
const GitHubGraphQL = ({setQueryLoading, setQueryResultSize, searchCriteria='', issueState='', searchLimit=DEFAULT_SEARCH_LIMIT}) => {
  return (
  <Query query={constructGraphQLQuery({searchCriteria, issueState, searchLimit})}>
    {({ loading, error, data }) => {
      // notify parent of state
      setQueryLoading(loading);

      if (loading) return <p style={{padding: 10}}></p>;
      if (error) return <p style={{padding: 10}}>Error :(</p>;

      // notify parent of result size
      setQueryResultSize(data.search.issueCount);

      const lists = data.search.edges.map(issue => (
        <div style={{margin:10}} key={issue.node.number}>
          <IssueCard
            number={issue.node.number}
            title={issue.node.title}
            state={issue.node.state}
            createdAt={issue.node.createdAt}
            author={issue.node.author}
            url={issue.node.url}
            body={issue.node.bodyHTML}
            labels={issue.node.labels} />
        </div>
      ))

      /*
      // construct media card via props
      const lists = data.search.map(issue => (
        <div style={{margin:10}} key={issue.id}>
        </div>
      ));
      */

      return (
        <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fill, 355px)'}}>
          {lists}
        </div>
      );
    }}
  </Query>
  );
};

export default GitHubGraphQL;