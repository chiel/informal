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

## Trigger groups

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

## Field types

### Options

These options are generic for all field types

- `type`: Defines what field type you desire,
- `label`: The label text to be used
- `id`: Id of the field (useful for javascript hooks)
- `name`: Name of the field. This will be important for your server-side code
- `defaultValue`: Default value to put into the field
- `attributes`: An object with key/value pairs for html attributes. Useful for
  setting placeholders and data attributes

### Text field

Example field specification:

```json
{
	"type": "text",
	"id": "firstName",
	"name": "firstName",
	"defaultValue": ""
}
```

