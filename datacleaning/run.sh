rm -f clean.class, output.txt
javac clean.java
java clean < test.csv
echo
cat output.txt
echo
