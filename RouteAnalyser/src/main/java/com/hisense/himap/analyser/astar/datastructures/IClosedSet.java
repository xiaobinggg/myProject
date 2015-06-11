package com.hisense.himap.analyser.astar.datastructures;

import com.hisense.himap.analyser.astar.ISearchNode;

public interface IClosedSet {

	public boolean contains(ISearchNode node);
	public void add(ISearchNode node);
	public ISearchNode min();

}
