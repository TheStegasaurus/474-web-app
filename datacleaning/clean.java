import java.io.BufferedWriter;
import java.io.OutputStreamWriter;
import java.io.Writer;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.Scanner;
import java.util.HashMap;
import java.util.regex.Pattern;
import java.util.regex.Matcher;

public class clean {
    public static void main(String[] args) throws IOException {

        //Writer writer = new BufferedWriter(new OutputStreamWriter(new FileOutputStream ("output.txt"), "utf-8"));

        //writer.write("SDADAS\n");
        //writer.close();


        Scanner scan = new Scanner(System.in); //TODO change this to static file for error handling

//String regex = "[a-zA-Z]{3,4} \\d{3}?";
Pattern regex = Pattern.compile("[a-zA-Z]{3,4} \\d{3}?");

        HashMap<String, HashMap<String, String>> prefixMap = new HashMap<String, HashMap<String, String>>();
int x = 0;
        while (x < 20)
        {
            String[] line = scan.nextLine().split("\\|");
            if (line.length < 3)
                continue;


            /*for (String i : line)
                System.out.print(i + "|");
            System.out.println();*/
 Matcher m = regex.matcher(line[2]);
    while (m.find()) {
    System.out.print(m.group(0) + "|");
}
System.out.println();
//String cleanWord = line[2].replaceAll(regex, "FOUND");

 //           System.out.println(cleanWord);

            x++;
        }


    }
}
