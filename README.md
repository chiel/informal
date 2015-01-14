# Informal

Informal is a form-building library. It takes a JavaScript object which specify
how the form should look and then takes it from there. Using a JavaScript object
as the source of the form means you can store it in a JSON file and write a
server-side validation script for it, meaning you can keep things in one
location.


## Usage
Informal is written in CommonJS format and can be installed through `npm`. Using
this, you can use a tool such as [browserify][browserify] to add it to your
build.

```bash
$ npm install --save informal
```

Once installed, you can use Informal as follows:

```javascript
var informal = require('informal');
var form = new informal.Form(spec, data);
myElement.appendChild(form.wrap);
```

Where `spec` is your form definition , and `data` is an object with values for
your fields.


## Format

Forms created by Informal always consist of at least one `page`, `group` and
`field`. Even if you require only a single page or group, this hierarchy is
still expected. A sample form definition would look something like this:

```json
{
  "pages": [
    {
      "name": "Personal details",
      "groups": ["group1"]
    }
  ],

  "groups": {
    "group1": {
      "name": "Your name",
      "fields": ["first_name", "last_name"]
    }
  },

  "fields": {
    "first_name": {
      "type": "text",
      "label": "First name"
    },
    "last_name": {
      "type": "text",
      "label": "Last name"
    }
  }
}
```

The hierarchy, as you can see, is always `pages` > `groups` > `fields`. The
reason they're not actually nested is cause this way it'll be easier to also use
for validation, for example.


## Basic usage

The main definition can contain the following keys

- `pager`: pager options
- `pages`: array of page objects
- `group`: object of groups
- `fields`: object of fields

All are required, except `pager`.


### `pager`

The pager object has two possible keys

- `type`: pager type, defaults to `numbered`
- `position`: where to put the pager, can be `top` or `bottom`


### `pages`

Each item in the array is a page: an object with the following keys

- `type`: page type, defaults to `default`
- `name`: page name
- `groups`: array of group names


### `groups`

The keys in this object are referenced by the `groups` property of each page.
Each group can contain the following keys

- `type`: group type, defaults to `default`
- `name`: group name
- `fields`: array of field names


### `fields`

The keys in this object are referenced by the `fields` property of each group.
Each key is also used as the `name` if it isn't specified. The following keys
are generic for each field type

- `type`: field type
- `label`: label text
- `name`: name of the field
- `value`: default value
- `required`: true if field is required
- `attributes`: object with key/value pairs for html attributes


#### `text`/`email`/`password`/`number`/`date`/`time`

```json
{
  "type": "text",
  "label": "First name"
}
```

- `type`: one of `text`, `email`, `password`, `number`, `date` or `time`


#### `single_option`

```json
{
  "type": "single_option",
  "style": "radio",
  "label": "Gender",
  "options": [
    { "value": "male", "label": "Male" },
    { "value": "female", "label": "Female" }
  ]
}
```

##### Options

- `style`: rendering style, select box (`select`, default) or radio buttons
  (`radio`)
- `options`: an array of objects
  - `value`: actual value of the option
  - `label`: display value of the option, defaults to `value`


#### `multi_option`

```json
{
  "type": "multi_option",
  "style": "checkbox",
  "label": "Interests",
  "options": [
    { "value": "cycling", "text": "Cycling" },
    { "value": "gaming", "text": "Gaming" },
    { "value": "skateboarding", "text": "Skateboarding" },
    { "value": "swimming", "text": "Swimming" }
  ],
  "value": ["cycling", "skateboarding"]
}
```

##### Options

- `style`: rendering style, select box (`select`, default) or checkboxes
  (`checkbox`)
- `options`: an array of objects
  - `value`: actual value of the option
  - `label`: display value of the option, defaults to `value`
- `value`: can also be an array for this field type, if multiple options are
  selected
