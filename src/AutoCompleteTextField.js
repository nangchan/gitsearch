// import fetch from 'cross-fetch';
import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';

import {client} from './App';
import {constructGraphQLQuery} from './GitHubGraphQL';

// function sleep(delay = 0) {
//   return new Promise(resolve => {
//     setTimeout(resolve, delay);
//   });
// }

/**
 * Auto-complete component used to search issues by title
 * 
 * @param {function} setQuery [required] - Function used to set the query parameters received by the search form
 * @param {string} searchCriteria [optional] - Query string to search for in repo issues (eg. useEffect hooks)
 * @param {string} issueState [optional] - State of issue (eg. 'open' or 'closed')
 * @param {number} searchLimit [optional] - Number of issues (sorted by latest)
 */
export default function AutoCompleteTextField({setQuery, searchCriteria, issueState, searchLimit}) {
  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState([]);
  const loading = open && options.length === 0;

  React.useEffect(() => {
    let active = true;

    if (!loading) {
      return undefined;
    }

    (async () => {
      const response = await client.query({
        query: constructGraphQLQuery({searchCriteria, issueState, searchLimit})
      });

      // set search by title options
      if (active) {
        setOptions(response.data.search.edges.map(edge => ({name: edge.node.title})));
      }
    })();

    return () => {
      active = false;
    };
  }, [loading, searchCriteria, issueState, searchLimit]);

  React.useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open, searchCriteria, issueState, searchLimit]);

  return (
    <Autocomplete
      id="asynchronous-demo"
      style={{ width: 1045 }}
      open={open}
      onOpen={(event) => {
        setOpen(true);
      }}
      // handle selection with mouse
      onClose={(event) => {
        setOpen(false);

        // set search criteria from auto-complete input box
        // filter for focusable mouse selections
        if (event.target.dataset.focus) {
          const selection = event.target.value || event.target.innerHTML;
          setQuery(query => ({
            ...query,
            search_criteria: selection,
          }));
        }
      }}
      // handle selection with keyboard
      onKeyDown={(event) => {
        // set search criteria from auto-complete input box
        const selection = event.target.value;
        if (event.key === 'Enter' && selection === '') {
          setQuery(query => ({
            ...query,
            search_criteria: selection,
          }));
        }
      }}
      // handle clear with mouse
      onChange={(event) => {
        // if clicking x then clear query
        if (event.target.tagName === 'svg' || event.target.tagName === 'path') {
          console.log('yo')
          setQuery(query => ({
            ...query,
            search_criteria: '',
          }));
        }
      }}
      autoComplete
      getOptionSelected={(option, value) => option.name === value.name}
      getOptionLabel={option => option.name}
      options={options}
      loading={loading}
      renderInput={params => (
        <TextField
          {...params}
          label="Search Issues By Title"
          variant="outlined"
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <React.Fragment>
                {loading ? <CircularProgress color="inherit" size={20} /> : null}
                {params.InputProps.endAdornment}
              </React.Fragment>
            ),
          }}
        />
      )}
    />
  );
}