
import com.vividsolutions.jts.geom.*;

import java.awt.AWTException;
import java.awt.Dimension;
import java.awt.Rectangle;
import java.awt.Robot;
import java.awt.Toolkit;
import java.awt.image.BufferedImage;
import java.io.File;
import java.util.ArrayList;
import java.util.List;

import javax.imageio.ImageIO;

public class ReadColorTest {


	/**
	 * 读取一张图片的RGB值
	 *
	 * @throws Exception
	 */
	public void getImagePixel(String image) throws Exception {
		int[] rgb = new int[3];
		File file = new File(image);
		BufferedImage bi = null;
		try {
			bi = ImageIO.read(file);
		} catch (Exception e) {
			e.printStackTrace();
		}
		int width = bi.getWidth();
		int height = bi.getHeight();
		int minx = bi.getMinX();
		int miny = bi.getMinY();
		System.out.println("width=" + width + ",height=" + height + ".");
		System.out.println("minx=" + minx + ",miniy=" + miny + ".");

		GeometryFactory factory = new GeometryFactory();
		List<Point> resultPoints = new ArrayList<Point>();

		for (int i = minx; i < width; i++) {
			for (int j = miny; j < height; j++) {
				int pixel = bi.getRGB(i, j); // 下面三行代码将一个数字转换为RGB数字
				rgb[0] = (pixel & 0xff0000) >> 16;
				rgb[1] = (pixel & 0xff00) >> 8;
				rgb[2] = (pixel & 0xff);
				//if(rgb[0] >= 220 && rgb[1] >= 220 && rgb[2] >= 220 && rgb[0] <= 235 && rgb[1] <= 235 && rgb[2] <= 235){
				if(rgb[0] == 220 && rgb[1] == 220 && rgb[2] >= 224){
					Point point = factory.createPoint(new Coordinate(i,j));

					resultPoints.add(point);
					System.out.println("i=" + i + ",j=" + j + ":(" + rgb[0] + ","+ rgb[1] + "," + rgb[2] + ")");
				}
			}
		}
		System.out.println(resultPoints.size());

		ArrayList<LineString> resultLines = new ArrayList<LineString>();

		for(Point point:resultPoints){
			Boolean ismerged = false;
			for(int linenum = 0;linenum<resultLines.size();linenum++){
				LineString line = resultLines.get(linenum);
				if(line.distance(point)<=1.5){
					Coordinate[] coordinates = line.getCoordinates();
					Coordinate[] newcoordinates = new Coordinate[coordinates.length+1];
					System.arraycopy(coordinates, 0, newcoordinates, 0, coordinates.length);
					newcoordinates[newcoordinates.length-1] = point.getCoordinate();

					line = factory.createLineString(newcoordinates);
					resultLines.set(linenum,line);
					ismerged = true;
					break;
				}
			}
			if(!ismerged){
				resultLines.add(factory.createLineString(new Coordinate[]{point.getCoordinate(),point.getCoordinate()}));
			}
		}
		System.out.println(resultLines.size());



	}

	/**
	 * 返回屏幕色彩值
	 *
	 * @param x
	 * @param y
	 * @return
	 * @throws AWTException
	 */
	public int getScreenPixel(int x, int y) throws AWTException { // 函数返回值为颜色的RGB值。
		Robot rb = null; // java.awt.image包中的类，可以用来抓取屏幕，即截屏。
		rb = new Robot();
		Toolkit tk = Toolkit.getDefaultToolkit(); // 获取缺省工具包
		Dimension di = tk.getScreenSize(); // 屏幕尺寸规格
		System.out.println(di.width);
		System.out.println(di.height);
		Rectangle rec = new Rectangle(0, 0, di.width, di.height);
		BufferedImage bi = rb.createScreenCapture(rec);
		int pixelColor = bi.getRGB(x, y);

		return 16777216 + pixelColor; // pixelColor的值为负，经过实践得出：加上颜色最大值就是实际颜色值。
	}

	/**
	 * @param args
	 */
	public static void main(String[] args) throws Exception {
		int x = 0;
		ReadColorTest rc = new ReadColorTest();
		x = rc.getScreenPixel(100, 345);
		System.out.println(x + " - ");
		rc.getImagePixel("F:\\EzMap.jpg");
	}

}