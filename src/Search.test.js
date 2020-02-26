import React from 'react';
import { mount } from 'enzyme';
import Search from './Search';

// for debugging
//import beautify from 'js-beautify';

/**
 * Validate search page by populating each field and
 * verifying the calls to setQuery
 */
test('test search page form fields', () => {
  // query sent to GitHub GraphQL API
  const [query, setQuery] = [
    {
      search_criteria: '',
      issue_state: '',
      limit: 50,
    }, // initial state
    jest.fn() // mock setState
  ];

  const wrapper = mount(
    <Search query={query} setQuery={setQuery} />
  );

  // populate form fields

  const search_criteria = wrapper.find('input[name="search_criteria"]').first();
  search_criteria.simulate('change', {target: {name: 'search_criteria', value: 'My Mission'}});    

  const form = {
    search_criteria: wrapper.find('input[name="search_criteria"]').first().props().value,
    issue_state: wrapper.find('select[name="issue_state"]').first().props().value,
    limit: wrapper.find('select[name="limit"]').first().props().value,
  }

  // validate form field entered
  expect(form).toStrictEqual({
    search_criteria: 'My Mission',
    issue_state: ' ',
    limit: 50,
  });

  // submit form
  const submit = wrapper.find('button[type="submit"]').first();
  submit.simulate('submit');

  // validate call to setQuery using mocked function
  expect(setQuery.mock.calls).toEqual([
    [{
      search_criteria: 'My Mission',
      issue_state: ' ',
      limit: 50,
    }]
  ]);

  // for debugging
  //console.log(wrapper.debug);
  //console.log(beautify(wrapper.html()));
});

