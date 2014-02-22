# Informal

Informal is a form-building library, it takes a JSON object and builds up all
the required elements as needed. The reason for using a JSON object is mainly
cause it makes it easy to share form configurations (validation etc) easier to
share between front and backend, no matter what language you're using.

## Usage

```shell
npm install informal
```

```javascript
var informal = require('informal');
var form = new informal.Form(spec, data);
form.toHTML();
```

Where `spec` is your javascript object representing the form.

## Format

In order to stay consistent, each form consists of at least one `page`, `group`
and `field`. Even if you have only a single page or group, it still expects this
hierarchy. A sample `formal` specification would look something like this:

```json
{
  "method": "get",
  "action": "#",
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

The hierarchy, as you can see, is always `form` > `pages` > `groups` > `fields`.
We'll elaborate on these types and their options further down

## Form

### Options

- `method`: defaults to `get`
- `action`: defaults to `#`
- `pages`: array of page objects

## Pages

### Options

- `type`: page type; defaults to `default`
- `title`: page title
- `groups`: array of group objects

## Groups

### Options

- `type`: group type; defaults to `default`
- `title`: group title
- `fields`: array of field objects

## Field types

### Options

These options are generic for all field types

- `type`: field type
- `label`: label text to be used
- `name`: name of the field
- `value`: default value
- `required`: true if field is mandatory
- `attributes`: object with key/value pairs for html attributes

### Text, email, password field

Example:

```json
{
  "type": "text",
  "id": "firstName",
  "name": "firstName"
}
```

`type` will be one of `text`, `email` or `password`.

### Single option preset values

Example:

```json
{
  "type": "single-option",
  "style": "radio",
  "label": "Title",
  "name": "title",
  "options": [
    {"value": "mr", "text": "Mr."},
    {"value": "mrs", "text": "Mrs."}
  ]
}
```

#### Additional options

- `style`: how the field should be displayed, as a select box (`select`) or a
  set of radio buttons (`radio`)
- `options`: an array of objects, each object specifying a `value` and `text`
  key

### Multiple option preset values

Example:

```json
{
  "type": "multi-option",
  "style": "checkbox",
  "label": "Interests",
  "name": "interests",
  "options": [
    {"value": "cycling", "text": "Cycling"},
    {"value": "running", "text": "Running"},
    {"value": "swimming", "text": "Swimming"},
    {"value": "gaming", "text": "Gaming"}
  ],
  "value": ["cycling", "gaming"]
}
```

#### Additional options

- `value`: can also be an array if multiple values should be preselected
- `style`: how the field should be displayed, as a multiple select box
  (`select`) or a set of checkboxes (`checkbox`)
- `options`: an array of objects, each object specifying a `value` and `text`
  key
