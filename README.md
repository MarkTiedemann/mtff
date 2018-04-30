# MTFF

**Mark's Translation File Format.**

```
~ hello
  en: Hello!
  de: Hallo!
  es: ¡Hola!
```

MTFF aims to be a minimal, highly-opinionated translation file format that's **pleasant to read and write** due to obvious semantics:

```
! This is a comment
```

```
~ and_this_is_a_translation_key
  en: With a translation in English!
```

```
~ trailing_spaces
  en: Will be cut off automatically.
```

```
~ but_i_need_trailing_spaces
  en: In this case, end the line with a caret:  ^

! Now, the above line ends with two spaces.
```

```
~ but_i_need_carets
  en: Well, use \ to escape them, e.g.: \^

! The above translations now ends with a caret
! instead of a space.
```

```
~ multi_line_strings
  en: [
‎    ...are supported, too.
‎    Note that each line will end with a \n.
    Except for the last line.
‎  ]
```

```
~ but_thats_annoying
  en: (
    Well, if you use round brackets,
    your lines will wrap smoothly,
    joined by a single space.
  )
```

MTFF also has a few other characteristics:

* **To avoid inconsistent spacing**, MTFF is whitespace-sensitive for both leading and trailing whitespaces. For example:

  * Single-line translations MUST be indented with 2 spaces.
  * Multi-line translations MUST be indented with 4 spaces.
  * A comment MUST NOT be followed by a space character.

* **To avoid missing translations**, the number of language keys in all translation files MUST be equal. For example, the following should NOT be done:

```
! file1

~ hello
  en: Hello!
```

```
! file2

~ see_you
  en: See you!
  de: Wir sehen uns!
```

* **To avoid confusing translators**, all language keys in all translation files MUST appear in the same order. For example, the following should NOT be done:

```
~ hello
  de: Hallo!
  en: Hello!

~ see_you
  en: See you!
  de: Wir sehen uns!
```

* **To avoid all-at-once translations**, translations MAY be marked with `???`, in which case the value of the first language that is provided will be used as the default value (thus, this is only possible, if there are at least 2 different languages), for example:

```
~ hello
  en: Hello!
  de: ???

! Since `de` is marked as missing, `en` will be used as a fallback.
! Thus, the above is equivalent to the following:
!
! en: Hello!
! de: Hello!
```

* **To avoid hard-to-read translations**, all lines of a translation file MUST be shorter than 60 characters. For example, the following should NOT be done:

```
~ just_a_normal_greek_dish
  en: Lopadotemachoselachogaleokranioleipsanodrimhypotrimmatosilphioparaomelitokatakechymenokichlepikossyphophattoperisteralektryonoptekephalliokigklopeleiolagoiosiraiobaphetraganopterygo
  el: λοπαδοτεμαχοσελαχογαλεοκρανιολειψανοδριμυποτριμματοσιλφιοκαραβομελιτοκατακεχυμενοκιχλ­επικοσσυφοφαττοπεριστεραλεκτρυονοπτοκεφαλλιοκιγκλοπελειολαγῳοσιραιοβαφητραγανοπτερύγων
```
