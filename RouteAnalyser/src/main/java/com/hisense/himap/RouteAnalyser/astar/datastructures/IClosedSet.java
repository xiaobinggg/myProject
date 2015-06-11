package com.hisense.himap.routeAnalyser.astar.datastructures;

import com.hisense.himap.routeAnalyser.astar.ISearchNode;

public interface IClosedSet {

	public boolean contains(ISearchNode node);
	public void add(ISearchNode node);
	public ISearchNode min();

}
