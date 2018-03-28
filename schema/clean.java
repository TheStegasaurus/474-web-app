import java.io.BufferedWriter;
import java.io.OutputStreamWriter;
import java.io.Writer;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.Scanner;
import java.util.regex.Pattern;
import java.util.regex.Matcher;

public class clean {
    public static void main(String[] args) throws IOException
    {
        Scanner scan = new Scanner(System.in); //TODO change this to static file for error handling

        //To write the output
        Writer writer = new BufferedWriter(new OutputStreamWriter(new FileOutputStream ("prereq.csv"), "utf-8"));

        //The regex to find a prefix followed by a number
        Pattern regex = Pattern.compile("[a-zA-Z]{3,4} \\d{3}?");

        while (scan.hasNextLine())
        {
            //Split on |
            String[] line = scan.nextLine().split("\\|");

            //Checks if prereq is not null
            if (line.length < 3)
                continue;

            //Matches the line to the regex
            Matcher m = regex.matcher(line[2]);
            //Loops through each match in the line
            while (m.find()) 
            {
                //Writes each prereq as a new line in the output
                String[] prereq = m.group(0).split(" ");
                writer.write(line[0] + "|" + line[1] + "|" + prereq[0] + "|" + prereq[1] + "\n");
            }
        }
        scan.close();
        writer.close();
    }
}
