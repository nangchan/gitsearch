import React from 'react';

import { Form, Field } from 'react-final-form';
import { TextField } from 'final-form-material-ui';
import createDecorator from 'final-form-focus';

import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import SearchIcon from '@material-ui/icons/Search';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

// placeholder for form error during form validation (not yet fully used)
const focusOnError = createDecorator()

/**
 * Search form rendered on side drawer used to lookup customers
 * 
 * @param {object} query [required] - Object containing query populated with defaults used to pre-populate limit
 * @param {function} setQuery [required] - Function used to set the query parameters received by the search form
 * @param {number} queryResultSize [required] - Number of results from query used to display to the user
 * 
 * @returns JSX Final-Form search form used by the user to specify search criteria
 */
const Search = ({query, setQuery, queryResultSize}) => {

  return (
    <Form
      decorators={[focusOnError]}
      onSubmit={(values, form)=>setQuery(values)} // no-op
      render={({ handleSubmit, form, submitting }) => (
        <form onSubmit={handleSubmit} noValidate>
          <ListItem button type="submit" component="button" selected={true} >
            <ListItemIcon><SearchIcon /></ListItemIcon>
            <ListItemText primary={`Found: ${queryResultSize}`}/>
          </ListItem>
          <Paper style={{ padding: 16 }} elevation={/* disable shadows */0}>
            <Grid container alignItems="flex-start" spacing={2}>
              <Grid item xs={12}>
                <Field
                  fullWidth
                  name="search_criteria"
                  component={TextField}
                  variant="outlined"
                  type="search"
                  label="Search Criteria"
                />
              </Grid>
              <Grid item xs={12}>
                <Field
                  fullWidth
                  name="issue_state"
                  select
                  variant="outlined"
                  SelectProps={{
                    native: true,
                  }}
                  component={TextField}
                  label="Issue State"
                  initialValue={" "} // needs to be space for final-form to not overlap text
                >
                  <option value=" ">any</option>
                  <option value="open">open</option>
                  <option value="closed">closed</option>
                </Field>
              </Grid>
              <Grid item xs={12}>
                <Field
                  fullWidth
                  name="limit"
                  select
                  variant="outlined"
                  SelectProps={{
                    native: true,
                  }}
                  component={TextField}
                  label="Search Limit"
                  initialValue={query.limit}
                >
                  <option value="5">5</option>
                  <option value="10">10</option>
                  <option value="25">25</option>
                  <option value="50">50</option>
                  <option value="100">100</option>
                </Field>
              </Grid>
              <Grid item style={{ }}>
                <Button
                  type="button"
                  variant="contained"
                  onClick={form.reset}
                  disabled={submitting}
                >
                  Reset
                </Button>
              </Grid>
              <Grid item style={{ display: 'flex', flexGrow: 1, justifyContent: 'flex-end' }}>
                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    disabled={submitting}
                  >
                    Submit
                  </Button>
                </Grid>
            </Grid>
          </Paper>
        </form>
      )}
    />
  );
};

export default Search;