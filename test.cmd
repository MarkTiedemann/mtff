@echo off
set flags=--experimental-modules --no-warnings
call node %flags% split_lines_test.mjs
call node %flags% print_char_test.mjs
call node %flags% tokenize_test.mjs
call node %flags% tokenize_comment_test.mjs