# Formal

Formal is a form-building library, it takes a JSON object and builds up all the
required elements as needed. The reason for using a JSON object is mainly cause
it makes it easy to share form configurations (validation etc) easier to share
between front and backend, no matter what language you're using.

## Building

In order to build, you'll need to run something along these lines:

```shell
$ npm install
$ ./node_modules/wrapup/bin/wrup.js -r formal ./index.js -o ./build/formal.js --globalize window
```

This will create `./build/formal.js` and when you load it into your html, it'll
expose `window.formal`.

## Usage

Once you've built, you can use formal like so:

```javascript
new formal.Form(document.getElementById('myForm'), specification);
```

Where specification is your javascript object representing the form.

## Format

In order to stay consistent, each form consists of at least one `page`, `group`
and `field`. Even if you have only a single page or group, it still expects this
hierarchy. A sample `formal` specification would look something like this:

```json
{
  "method": "get",
  "action": "#",
  "pages": [{
    "type": "main",
    "title": "Personal details",
    "groups": [{
      "type": "main",
      "title": "Your name",
      "fields": [{
        "type": "text",
        "label": "First name"
      }, {
        "type": "text",
        "label": "Last name"
      }]
    }]
  }]
}
```

The hierarchy, as you can see, is always `form` > `pages` > `groups` > `fields`.
We'll elaborate on these types and their options further down

## Form

### Options

- `method`: defaults to `post`
- `action`: defaults to `#`
- `pages`: array of page objects

## Pages

### Options

- `type`: page type
- `title`: page title
- `groups`: array of group objects

## Groups

### Options

- `type`: group type
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

### Triggers

Sometimes, cases arise where you want to be able to show some extra values
depending on the value of a field. To do this, there's a mechanism called
trigger groups.

You can add triggers to any type of field, by adding a `triggers` key, which
takes an object with values to trigger on as it's keys. Each of these values
will have an array of group definitions.

```json
{
  "triggers": {
    "value to trigger on": [{
      "type": "inline",
      "fields": [{
        "type": "text",
        ...
      }]
    }]
  }
}
```

The type of field this trigger is linked to will determine how it's triggered.

### Text field

Example:

```json
{
  "type": "text",
  "id": "firstName",
  "name": "firstName"
}
```

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
    {"value": "mrs", "text": "Mrs." }
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
    {"value": "swimming", "text": "Swimming" },
    {"value": "gaming", "text": "Gaming" }
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

